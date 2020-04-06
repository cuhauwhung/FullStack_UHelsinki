

export default class Course {
    constructor(course_name) {
      this.name = course_name;
      this.exercises = [];
      this.total_num = 0;
    }
  
    add_exercise(part_num, exercise_num){
      this.exercises.push(part_num + " (" + exercise_num + ") \n");
      this.total_num += exercise_num;
    }
  }