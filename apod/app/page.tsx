"use client";

import {
  Box,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Picture {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export default function Home() {
  const [pictures, setPictures] = useState<Picture | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleGetPicture = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=PfFDxdIdVjUFf2tJ61s1hOZBpUxD1fQ5lNJwkVlg`
      );
      console.log(response.data.url);
      setPictures(response.data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Picture>(
          `https://api.nasa.gov/planetary/apod?api_key=PfFDxdIdVjUFf2tJ61s1hOZBpUxD1fQ5lNJwkVlg`
        );
        console.log(response.data);
        setPictures(response.data);
      } catch (error) {
        console.error("Error fetching picture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
        console.log(formattedDate);
        const response = await axios.get<Picture>(
          `https://api.nasa.gov/planetary/apod?api_key=PfFDxdIdVjUFf2tJ61s1hOZBpUxD1fQ5lNJwkVlg${
            formattedDate ? `&date=${formattedDate}` : ""
          }`
        );
        console.log(response.data);
        setPictures(response.data);
      } catch (error) {
        console.error("Error fetching picture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          background: [
            "hsla(5, 93%, 28%, 1)",
            "linear-gradient(90deg, hsla(5, 93%, 28%, 1) 0%, hsla(34, 10%, 13%, 1) 100%)",
            "-moz-linear-gradient(90deg, hsla(5, 93%, 28%, 1) 0%, hsla(34, 10%, 13%, 1) 100%)",
            "-webkit-linear-gradient(90deg, hsla(5, 93%, 28%, 1) 0%, hsla(34, 10%, 13%, 1) 100%)",
            'progid: DXImageTransform.Microsoft.gradient( startColorstr="#8C1105", endColorstr="#25221E", GradientType=1 )',
          ],
          color: "rgb(123, 117, 117)",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <Typography sx={{ marginTop: "50px" }} variant="h2">
          Astronomy Picture of the Day
        </Typography>
        {/* <Button onClick={handleGetPicture}>Get</Button> */}
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            sx={{ color: "white" }}
            onChange={(date) => setDate(date)}
          />
        </LocalizationProvider>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {pictures ? (
              <img
                src={pictures.url}
                alt={pictures.title}
                style={{ width: "500px", height: "300px" }}
              ></img>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </>
  );
}
