export const convertStringtoDate = (str) => {
  const parts = str.split("-"); // Tách ngày, tháng, năm thành mảng

  // parts[0] chứa ngày, parts[1] chứa tháng, parts[2] chứa năm
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[0], 10);

  // Tạo đối tượng Date mới
  const dateObject = new Date(year, month, day);
  return dateObject;
};
