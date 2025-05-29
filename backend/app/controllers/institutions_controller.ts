import BasesController from './bases_controller.js'
import Institution from '#models/institution'

export default class InstitutionsController extends BasesController {
  protected getModel() {
    return Institution
  }
}
