
import Phaser from 'phaser';
import { InventoryItem } from './types/InventoryTypes';

export default class ItemPopup extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private itemNameText: Phaser.GameObjects.Text;
  private itemDescText: Phaser.GameObjects.Text;
  private closeBtn: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);

    this.setDepth(200).setVisible(false);

    // Popup background
    this.background = scene.add.rectangle(400, 300, 300, 160, 0x000000, 0.8);
    this.background.setStrokeStyle(2, 0xffffff);
    this.add(this.background);

    // Item name
    this.itemNameText = scene.add.text(320, 250, '', {
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.add(this.itemNameText);

    // Description placeholder
    this.itemDescText = scene.add.text(320, 280, '', {
      fontSize: '14px',
      color: '#dddddd',
      wordWrap: { width: 260 },
    });
    this.add(this.itemDescText);

    // Close button
    this.closeBtn = scene.add.text(420, 340, '[Close]', {
      fontSize: '14px',
      color: '#ff6666',
    });
    this.closeBtn.setInteractive().on('pointerdown', () => this.hide());
    this.add(this.closeBtn);
  }

  public show(item: InventoryItem): void {
    this.itemNameText.setText(item.name);
    this.itemDescText.setText(`A mysterious item... [${item.iconKey}]`);
    this.setVisible(true);
  }

  public hide(): void {
    this.setVisible(false);
  }
}
