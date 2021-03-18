class DspDate extends Date {
  time: number = 0;

  constructor(timestamp: string) {
    super();
    if (typeof timestamp === "string") {
      this.time = Number(timestamp);
    } else {
      this.time = timestamp;
    }
  }

  private format(formatType: string = "YY|MM|DD", split: string = ".") {
    if (this.time) {
      let date = new Date(this.time);
      let year, month, day, hour, min, sec;
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();

      let newTime = "";
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

      if (formatType === "YY|MM|DD|HH:MM:SS") {
        newTime =
          "" +
          year +
          split +
          month +
          split +
          day +
          " " +
          hour +
          ":" +
          min +
          ":" +
          sec;
      } else if (formatType === "YY|MM|DD|HH:MM") {
        newTime =
          "" + year + split + month + split + day + " " + hour + ":" + min;
      } else if (formatType === "YY|MM|DD") {
        newTime = "" + year + split + month + split + day;
      } else if (formatType === "YY|MM") {
        newTime = "" + year + split + month;
      }
      return newTime;
    }
  }
}

export default {
  DspDate
};
