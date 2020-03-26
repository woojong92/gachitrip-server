const createKey = (target:string): any => {
    if (target === "PHONE") {
      return  Math.floor(Math.random() * 100000).toString();
    } else if (target === "EMAIL") {
      return  Math.random()
        .toString(36)
        .substr(2);
    }
}
