import BasesController from './bases_controller.js'
import Registration from '#models/registration'

export default class RegistrationsController extends BasesController {
  protected getModel() {
    return Registration
  }
}
