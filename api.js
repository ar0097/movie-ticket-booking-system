const API_URL = "https://movies-api-seven-orcin.vercel.app/api";

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getMovies = async () => {
  const res = await fetch(`${API_URL}/movies`);
  return res.json();
}

export const getMoviesById = async (id) => {
  const res = await fetch(`${API_URL}/movies/${id}`)
  return res.json();
}

export const bookSeats = async (data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const bookedSeats = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
}
