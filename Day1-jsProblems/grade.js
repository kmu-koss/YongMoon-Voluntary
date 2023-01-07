function grade(score) {
  if (91 <= score && score <= 100) {
    return "A";
  } else if (81 <= score && score <= 90) {
    return "B";
  } else if (71 <= score && score <= 80) {
    return "C";
  } else if (61 <= score && score <= 70) {
    return "D";
  } else {
    return "F";
  }
}

console.log(grade(50));
