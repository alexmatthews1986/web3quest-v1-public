/**
 * DialogueTreeManager.ts
 * Handles branching NPC conversations, player choices, and dynamic dialogue logic.
 * Works with DialogManager.ts to show/hide dialogue, and supports actions per choice.
 * Futureproofing: Add typing animations, speaker portraits, quest triggers, scroll styles.
 */

import DialogManager from './DialogManager'
import Phaser from 'phaser'

export interface DialogueNode {
  id: string
  text: string
  speaker?: string
  choices?: DialogueChoice[]
  next?: string // fallback if no choices
}

export interface DialogueChoice {
  text: string
  nextId: string
  action?: () => void // Optional effect (e.g., start quest)
}

export default class DialogueTreeManager {
  private scene: Phaser.Scene
  private dialogueData: Record<string, DialogueNode>
  private currentNodeId: string | null = null
  private dialogManager: DialogManager
  private choiceTexts: Phaser.GameObjects.Text[] = []

  constructor(scene: Phaser.Scene, dialogueData: Record<string, DialogueNode>) {
    this.scene = scene
    this.dialogueData = dialogueData
    this.dialogManager = new DialogManager(scene)
  }

  /**
   * Starts the dialogue tree from the given node ID.
   */
  start(nodeId: string): void {
    this.currentNodeId = nodeId
    this.displayCurrentNode()
  }

  /**
   * Renders current dialogue node and choices (if any).
   */
  private displayCurrentNode(): void {
    if (!this.currentNodeId) return

    const node = this.dialogueData[this.currentNodeId]
    if (!node) return

    // Clear old choices if any
    this.clearChoices()

    const speakerPrefix = node.speaker ? `${node.speaker}: ` : ''
    const fullMessage = `${speakerPrefix}${node.text}`

    this.dialogManager.showDialogue(fullMessage)

    // Render choices
    if (node.choices && node.choices.length > 0) {
      node.choices.forEach((choice, index) => {
        const y = 520 + index * 30
        const choiceText = this.scene.add.text(100, y, `> ${choice.text}`, {
          fontSize: '16px',
          color: '#00ffff',
          backgroundColor: '#000000',
          padding: { left: 10, right: 10, top: 4, bottom: 4 }
        }).setInteractive()

        choiceText.on('pointerdown', () => {
          this.dialogManager.hideDialogue()
          this.clearChoices()
          if (choice.action) choice.action()
          this.currentNodeId = choice.nextId
          this.displayCurrentNode()
        })

        this.choiceTexts.push(choiceText)
      })
    } else if (node.next) {
      // Continue on click
      this.scene.input.once('pointerdown', () => {
        this.dialogManager.hideDialogue()
        this.currentNodeId = node.next!
        this.displayCurrentNode()
      })
    }
  }

  /**
   * Removes all visible choices from scene.
   */
  private clearChoices(): void {
    this.choiceTexts.forEach(choice => choice.destroy())
    this.choiceTexts = []
  }
}
