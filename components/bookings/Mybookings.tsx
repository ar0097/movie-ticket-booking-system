import React, { useEffect, useState } from "react";
import "./Bookings.css";
import Navbar from "../Navbar/Navbar";
import { bookedSeats, bookSeats, getMoviesById } from "../../api";
// import { useParams } from "react-router-dom";

interface UserData {
  title: string;
  _id: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  showtimes: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface BookedType {
  _id: string;
  movieName: string;
  showtime: string;
  date: string;
  seats: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PropsTypes {
  id: string;
}

type seatsType = Record<string, number[]>;
const seats: seatsType = {
  A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  F: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

function Mybookings({ id }: PropsTypes) {
  const [showtime, setShowtime] = useState<string>("Select Showtime");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movie, setMovie] = useState<UserData | any>({});
  const [price, setPrice] = useState<number>(0);
  const [booked, setBooked] = useState<BookedType[]>([]);
  const [getData, setGetData] = useState<BookedType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  console.log("userName", getData);

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("user") as string) as string;
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    if (movie.showtimes && movie.showtimes.length > 0) {
      setShowtime(movie.showtimes[0]);
    }
    const movieBookings = booked.filter(
      (b) => b.movieName === movie.title && b.showtime === movie.showtimes[0]
    );
    setGetData(movieBookings);
  }, [booked, movie]);

  useEffect(() => {
    let id = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(id);
  });

  useEffect(() => {
    getMoviesById(id).then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    bookedSeats().then((data) => setBooked(data));
  }, []);

  const handleSeats = (row: string, num: number) => {
    if (!selectedSeats.includes(row + num)) {
      setSelectedSeats((prev) => [...prev, row + num]);
      setPrice((selectedSeats.length + 1) * 12);
    } else {
      setSelectedSeats((prev) => prev.filter((s) => s !== row + num));
      setPrice((selectedSeats.length - 1) * 12);
    }
  };

  const confirmBooking = () => {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const data = {
      movieName: movie.title,
      showtime: showtime,
      date:
        new Date().getDate() +
        "-" +
        month[new Date().getMonth()] +
        "-" +
        new Date().getFullYear(),
      seats: [...selectedSeats],
      price: price,
    };
    bookSeats(data).then((data) => console.log("data sent", data));
    setModal(false);
    setMessage("Booked");
    setSelectedSeats([]);
  };

  const handleModal = () => {
    if (selectedSeats.length === 0) {
      setMessage("Select Seats");
    } else {
      setModal(true);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="bookings">
      <Navbar />
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
      <div className="bookings-container">
        <button className="bookings-back-button">← Back to Movies</button>
        <h1 className="bookings-headings">{movie.title}</h1>

        <div className="bookings-times">
          <h1 className="booking-select-time">Select Showtime</h1>
          <div className="booking-time-cards">
            {movie.showtimes?.map((ele: string, id: number) => (
              <button
                key={id}
                className={`booking-time-button ${
                  showtime === ele && "active"
                } `}
                onClick={() => {
                  if (showtime === ele) {
                    setShowtime("Select Showtime");
                    const movieBookings = booked.filter(
                      (b) => b.movieName === movie.title
                    );
                    setGetData(movieBookings);
                  } else {
                    setShowtime(ele);
                    const filtered = booked.filter(
                      (item) =>
                        item.movieName === movie.title && item.showtime === ele
                    );
                    setGetData(filtered);
                  }
                }}
              >
                {ele}
              </button>
            ))}
          </div>
        </div>
        <div className="booking-seat">
          <h1 className="booking-select-heading">Select Seats</h1>
          <div className="booking-seat-card">
            <div className="booking-seat-heading">
              <div className="booking-seat-head">SCREEN</div>
            </div>
            <div className="booking-seat-arrangement">
              {Object.entries(seats).map(([row, numbers], id) => (
                <div className="booking-seat-row" key={id}>
                  <span className="row">{row}</span>
                  <div className="row-number">
                    {numbers.map((num, id) => (
                      <button
                        key={id}
                        className={`row-number-button ${
                          selectedSeats.includes(row + num) && "active"
                        } ${
                          getData?.some((b) => b.seats.includes(row + num))
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            getData?.some((b) => b.seats.includes(row + num))
                          ) {
                            alert("already booked");
                          } else {
                            handleSeats(row, num);
                          }
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="booking-status">
              <div className="booking-available">
                <div className="booking-available-checkbox"></div>
                <span style={{ color: "#a6a6a6" }}>Available</span>
              </div>
              <div className="booking-selected">
                <div className="booking-selected-checkbox"></div>
                <span style={{ color: "#f2f2f2" }}>Selected</span>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-selected-status">
          <div className="booikng-selected-details">
            <div className="booking-selected-time">
              <p style={{ color: "#a6a6a6" }}>
                Selected Seats:{" "}
                {selectedSeats.length === 0
                  ? "Select Seats"
                  : selectedSeats.map((ele) => ele + " ")}
              </p>
              <p style={{ color: "#a6a6a6" }}>Showtime: {showtime}</p>
            </div>

            <div
              style={{ textAlign: "right" }}
              className="booking-selected-price"
            >
              <p style={{ color: "#a6a6a6" }}>Total Amount</p>
              <p
                style={{
                  color: "#dc2828",
                  fontSize: "1.875rem",
                  lineHeight: "0.25rem",
                  fontWeight: "700",
                }}
              >
                ${price}.00
              </p>
            </div>
          </div>

          <button className="booking-confirm" onClick={handleModal}>
            Confirm Booking
          </button>
        </div>
        {modal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Confirm you Booking</h2>
                <p className="modal-description">
                  Please review your booking details before confirming.
                </p>
              </div>
              <div className="modal-body">
                <div className="modal-detail-row">
                  <p className="detail-label">Name:</p>
                  <p className="detail-value">{userName}</p>
                </div>
                <div className="modal-detail-row">
                  <p className="detail-label">Movie Name:</p>
                  <p className="detail-value">{movie.title}</p>
                </div>
                <div className="modal-detail-row">
                  <p className="detail-label">Showtime:</p>
                  <p className="detail-value">{showtime}</p>
                </div>
                <div className="modal-detail-row">
                  <p className="detail-label">Seats:</p>
                  <p className="detail-value">{selectedSeats.join(",")}</p>
                </div>
                <div className="modal-detail-row modal-total">
                  <p className="detail-label">Total Price:</p>
                  <p className="detail-value-total">${price}.00</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-button modal-button-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="modal-button modal-button-confirm"
                  onClick={confirmBooking}
                >
                  Final Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybookings;
