export const api = "https://elec-server.herokuapp.com/api";
// export const api = "http://localhost:5000/api";
export const generatePublicUrl = (filename) => {
  return `https://elec-server.herokuapp.com/public/${filename}`;
  // return `http://localhost:5000/public/${filename}`;
};
