import BasesController from './bases_controller.js'
import Student from '#models/student'

export default class StudentsController extends BasesController {
  protected getModel() {
    return Student
  }
}
