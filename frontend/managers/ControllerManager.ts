
import Phaser from 'phaser'

export default class ControllerManager {
  private scene: Phaser.Scene
  private gamepad?: Phaser.Input.Gamepad.Gamepad

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.initGamepadSupport()
  }

  private initGamepadSupport() {
    this.scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
      this.gamepad = pad
      console.log('Gamepad connected:', pad.id)
    })
  }

  update() {
    if (!this.gamepad) return

    if (this.gamepad.A) {
      console.log('A button pressed (accept/interact)')
      // Trigger quest/dialog/XP/etc
    }

    if (this.gamepad.B) {
      console.log('B button pressed (cancel/back)')
    }

    if (this.gamepad.leftStick.x !== 0 || this.gamepad.leftStick.y !== 0) {
      console.log('Moving with left stick:', this.gamepad.leftStick)
    }
  }
}
