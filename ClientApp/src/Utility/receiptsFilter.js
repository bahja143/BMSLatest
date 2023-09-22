function Filter(receipts, filter) {
  if (filter.startDate === "" && filter.endDate === "") {
    let result =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    return filter.paymentMethod === "All"
      ? result
      : result.filter((r) => r.paymentMethod === filter.paymentMethod);
  } else if (filter.startDate !== "" && filter.endDate !== "") {
    let names =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let paymentMethodes =
      filter.paymentMethod === "All"
        ? names
        : names.filter((r) => r.paymentMethod === filter.paymentMethod);

    return paymentMethodes.filter((d) => {
      let date = new Date(d.date);

      return date >= filter.startDate && date <= filter.endDate;
    });
  } else if (filter.startDate !== "") {
    let names =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let paymentMethodes =
      filter.paymentMethod === "All"
        ? names
        : names.filter((r) => r.paymentMethod === filter.paymentMethod);

    return paymentMethodes.filter((d) => {
      let date = new Date(d.date);

      return date >= filter.startDate;
    });
  } else if (filter.endDate !== "") {
    let names =
      filter.name === "All"
        ? receipts
        : receipts.filter((r) => r.name === filter.name);

    let paymentMethodes =
      filter.paymentMethod === "All"
        ? names
        : names.filter((r) => r.paymentMethod === filter.paymentMethod);

    return paymentMethodes.filter((d) => {
      let date = new Date(d.date);

      return date <= filter.endDate;
    });
  } else {
    return [];
  }
}

export default Filter;
