import InventoryManager from './InventoryManager'

export default class InventoryPickup {
  private scene: Phaser.Scene
  private inventory: InventoryManager

  constructor(scene: Phaser.Scene, inventory: InventoryManager) {
    this.scene = scene
    this.inventory = inventory
  }

  createPickup(x: number, y: number, key: string, itemName: string) {
    const icon = this.scene.add.image(x, y, key).setInteractive().setScale(0.5)
    icon.on('pointerdown', () => {
      this.inventory.addItem(itemName)
      icon.destroy()
    })
  }
}
