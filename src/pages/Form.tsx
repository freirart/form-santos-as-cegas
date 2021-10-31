import React, { useState, useRef } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { fillTelephone, fillAge, fillEmail } from "../helpers/formHelper";

import cardHeaderImg from "../assets/images/santos-as-cegas-form-header.jpg";

import "./styles.css";

function Form() {
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");

  const [emailError, setEmailError] = useState(false);

  const riskCheck = useRef(null);
  const certificateCheck = useRef(null);

  return (
    <div id="form-wrapper">
      <Card sx={{ maxWidth: 700 }}>
        <CardMedia
          component="img"
          height="140"
          image={cardHeaderImg}
          alt="Santos às cegas"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Agendar passeio "Santos às Cegas"
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Preencha as informações abaixo para agendar um passeio pelo projeto
            com o projeto "Santos às Cegas".
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ "& .MuiTextField-root": { m: 1, margin: "1rem 0" } }}
          >
            <TextField
              required
              label="Nome completo"
              fullWidth
              placeholder="Renato Frosch"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <TextField
              required
              fullWidth
              label="E-mail"
              value={email}
              error={emailError}
              placeholder="santosascegas@gmail.com"
              onChange={({ target }) => {
                const typedEmail = target.value;

                if (typedEmail && emailError) {
                  setEmailError(fillEmail(typedEmail));
                }
                setEmail(typedEmail);
              }}
              onBlur={({ target }) => {
                const typedEmail = target.value;

                if (typedEmail) {
                  setEmailError(fillEmail(typedEmail));
                }
              }}
              helperText={emailError ? "Entre com um e-mail válido!" : null}
            />
            <div className="nowrap-div">
              <TextField
                required
                label="Idade"
                placeholder="18"
                fullWidth
                value={age}
                onChange={({ target }) => setAge(fillAge(target.value))}
              />
              <TextField
                required
                fullWidth
                label="Telefone/Celular"
                placeholder="(99) 99999-9999"
                value={cellphone}
                onChange={({ target }) =>
                  setCellphone(fillTelephone(target.value))
                }
              />
            </div>

            <FormControlLabel
              control={<Checkbox ref={riskCheck} />}
              label="Concordo estar ciente acerca dos riscos envolvendo o passeio. *"
            />

            <FormControlLabel
              control={<Checkbox ref={certificateCheck} />}
              label="Concordo estar compromissado em trazer um atestado médico com
                  a permissão de atividades aeróbicas. *"
            />
          </Box>
          <div className="margin-top-div">
            <Button variant="contained" startIcon={<EventAvailableIcon />}>
              Agendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Form;
