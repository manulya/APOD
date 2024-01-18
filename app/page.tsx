"use client";
import { Box, CircularProgress, Switch, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Image from "next/image";
import SwiperBlock from "./swaper";
import "dayjs/locale/en-gb";
import { Picture } from "./types/picture";
import { URL } from "./consts";

export default function Home() {
  const [picture, setPicture] = useState<Picture | null>(null);
  const [picturesRange, setPicturesRange] = useState<Picture[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Picture>(
          `${URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        console.log(response.data);
        setPicture(response.data);
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
          `${URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}${
            formattedDate ? `&date=${formattedDate}` : ""
          }`
        );
        console.log(response.data);
        setPicture(response.data);
      } catch (error) {
        console.error("Error fetching picture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedStartDate = startDate
          ? dayjs(startDate).format("YYYY-MM-DD")
          : null;
        const formattedEndDate = endDate
          ? dayjs(endDate).format("YYYY-MM-DD")
          : null;

        const response = await axios.get<Picture[]>(
          `${URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}${
            formattedStartDate ? `&start_date=${formattedStartDate}` : ""
          }${formattedEndDate ? `&end_date=${formattedEndDate}` : ""}`
        );
        console.log(response.data);
        setPicturesRange(response.data);
      } catch (error) {
        console.error("Error fetching picture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const today = dayjs();

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
        <Typography
          sx={{ marginTop: "50px", maxWidth: "90%", textAlign: "center" }}
          variant="h2"
        >
          Astronomy Picture of the Day
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "row",
          }}
        >
          <Typography variant="button">Range</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
        {checked ? (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(startDate) => setStartDate(startDate)}
              disableFuture
              format="DD-MM-YYYY"
              sx={{
                ".MuiInputBase-root": {
                  color: "rgba(244, 239, 239, 0.763)",
                },
                ".MuiPickersToolbar-root": {
                  color: "#eaeef281",
                  borderRadius: 2,
                  border: "1px solid",
                  backgroundColor: "#bbdefb",
                },
              }}
            />
            <DatePicker
              label="End date"
              value={date}
              defaultValue={today.toString()}
              onChange={(endDate) => setEndDate(endDate)}
              disableFuture
              format="DD-MM-YYYY"
              sx={{
                ".MuiInputBase-root": {
                  color: "rgba(244, 239, 239, 0.763)",
                },
                ".MuiPickersToolbar-root": {
                  color: "#eaeef281",
                  borderRadius: 2,
                  border: "1px solid",
                  backgroundColor: "#bbdefb",
                },
              }}
            />
          </LocalizationProvider>
        ) : (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              value={date}
              onChange={(date) => setDate(date)}
              disableFuture
              format="DD-MM-YYYY"
              sx={{
                ".MuiInputBase-root": {
                  color: "rgba(244, 239, 239, 0.763)",
                },
                ".MuiPickersToolbar-root": {
                  color: "#eaeef281",
                  borderRadius: 2,
                  border: "1px solid",
                  backgroundColor: "#bbdefb",
                },
              }}
            />
          </LocalizationProvider>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {!checked ? (
              picture ? (
                picture.media_type === "video" ? (
                  <iframe
                    width="500"
                    height="300"
                    src={picture.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{
                      marginBottom: "100px",
                    }}
                  ></iframe>
                ) : (
                  <>
                    <Image
                      src={picture.url}
                      alt={picture.title}
                      width="500"
                      height="300"
                    ></Image>
                    <Typography
                      variant="body1"
                      sx={{ width: "70%", marginBottom: "50px" }}
                    >
                      {picture.explanation}
                    </Typography>
                  </>
                )
              ) : (
                <></>
              )
            ) : (
              <>
                {picturesRange && picturesRange.length > 0 ? (
                  <SwiperBlock pictures={picturesRange} />
                ) : (
                  <Typography>
                    No pictures available for the selected range.
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
}
