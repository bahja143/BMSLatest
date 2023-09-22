function Filter(receipts, filter) {
  if (filter.date === "" && filter.status === "") {
    let result =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    return filter.roomNumber === "All"
      ? result
      : result.filter((r) => r.roomNumber === filter.roomNumber);
  } else if (filter.date !== "" && filter.status !== "") {
    let patient =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let departments =
      filter.roomNumber === "All"
        ? patient
        : patient.filter((r) => r.roomNumber === filter.roomNumber);

    return departments.filter((d) => {
      let date = new Date(d.date);

      const obj = d.isCurrent
        ? new Date(d.endDate) > new Date()
          ? "Current"
          : "Expired"
        : "Throwed Out";

      return date >= filter.date && obj === d.status;
    });
  } else if (filter.date !== "") {
    let patient =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let departments =
      filter.roomNumber === "All"
        ? patient
        : patient.filter((r) => r.roomNumber === filter.roomNumber);

    return departments.filter((d) => {
      let date = new Date(d.date);

      return date >= filter.date;
    });
  } else if (filter.status !== "") {
    let patient =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let departments =
      filter.roomNumber === "All"
        ? patient
        : patient.filter((r) => r.roomNumber === filter.roomNumber);

    return departments.filter((d) => {
      const obj = d.isCurrent
        ? new Date(d.endDate) > new Date()
          ? "Current"
          : "Expired"
        : "Throwed Out";

      return obj === filter.status;
    });
  } else {
    return [];
  }
}

export default Filter;
