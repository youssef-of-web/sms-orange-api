import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import * as React from "react";
import { AiFillMessage, AiFillMobile, AiOutlineSend } from "react-icons/ai";
import "./App.css";

function App() {
  const [form, setForm] = React.useState({});

  const OnChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/sms", form)
      .then((res) => alert("success"))
      .catch((err) => alert(err.response.data));
  };
  return (
    <div className="App">
      <Divider className="divider">SMS SENDER</Divider>
      <Card>
        <CardContent className="inputs">
          <form onSubmit={onSubmitHandler} className="inputs">
            <FormControl variant="standard">
              <TextField
                id="number"
                label="Number"
                name="number"
                onChange={OnChangeHandler}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillMobile />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                id="message"
                label="Message"
                name="message"
                onChange={OnChangeHandler}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillMessage />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              endIcon={<AiOutlineSend />}
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
