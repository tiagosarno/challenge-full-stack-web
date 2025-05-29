import BasesController from './bases_controller.js'
import Class from '#models/class'

export default class ClassesController extends BasesController {
  protected getModel() {
    return Class
  }
}
