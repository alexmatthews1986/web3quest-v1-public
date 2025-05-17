import Phaser from 'phaser';

/**
 * Handles displaying and hiding in-game dialogue boxes.
 * Supports future enhancements: speaker name, animated text, portraits, styles, audio.
 */
export default class DialogManager {
  private scene: Phaser.Scene;
  private dialogBox!: Phaser.GameObjects.Rectangle;
  private dialogText!: Phaser.GameObjects.Text;
  private speakerText?: Phaser.GameObjects.Text;
  private portrait?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Shows a dialogue box with the provided message.
   * @param message - The full line of text to show.
   */
  showDialogue(message: string): void {
    this.clear();

    this.dialogBox = this.scene.add.rectangle(400, 500, 700, 100, 0x000000, 0.8).setOrigin(0.5);

    this.dialogText = this.scene.add.text(120, 470, message, {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 560 }
    });

    // 🎵 Optional scroll sound (can hook into AI Composer logic here)
    if (this.scene.sound) {
      this.scene.sound.play('dialogue_scroll_fx'); // preload this in MainScene
    }
  }

  /**
   * Show a speaker name label above the box (optional).
   * @param name - Speaker’s name.
   */
  showSpeaker(name: string): void {
    this.speakerText?.destroy();
    this.speakerText = this.scene.add.text(120, 440, name, {
      fontSize: '16px',
      color: '#ffff66',
      fontStyle: 'bold'
    });
  }

  /**
   * Show a speaker portrait image (optional).
   * @param key - Texture key from preload (e.g., 'mentor_portrait')
   */
  showPortrait(key: string): void {
    this.portrait?.destroy();
    this.portrait = this.scene.add.image(70, 490, key).setOrigin(0.5).setScale(0.5);
  }

  /**
   * Animates text as typewriter effect (future hook).
   * @param fullText - Full string to reveal.
   * @param speed - Delay in ms between each character.
   */
  typeText(fullText: string, speed: number): void {
    this.clear();
    this.dialogBox = this.scene.add.rectangle(400, 500, 700, 100, 0x000000, 0.8).setOrigin(0.5);
    this.dialogText = this.scene.add.text(120, 470, '', {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 560 }
    });

    let i = 0;
    const timer = this.scene.time.addEvent({
      delay: speed,
      repeat: fullText.length - 1,
      callback: () => {
        this.dialogText.text += fullText[i];
        i++;
      }
    });

    // 🔊 Optional: cue scroll FX once per letter or once on start
    if (this.scene.sound) {
      this.scene.sound.play('dialogue_scroll_fx');
    }
  }

  /**
   * Removes all visual elements.
   */
  clear(): void {
    this.dialogBox?.destroy();
    this.dialogText?.destroy();
    this.speakerText?.destroy();
    this.portrait?.destroy();
  }

  /**
   * Alias for clearing the dialog.
   */
  hideDialogue(): void {
    this.clear();
  }
}
