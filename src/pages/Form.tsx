import React, { useState } from "react";

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
  FormGroup,
  Tooltip,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { fillAge, fillEmail, fillCellphone } from "../helpers/formHelper";

import cardHeaderImg from "../assets/images/santos-as-cegas-form-header.jpg";

import "./styles.css";

function Form() {
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [checkedRisk, setCheckedRisk] = useState(false);
  const [checkedCertificate, setCheckedCertificate] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const isBtnDisabled =
    emailError ||
    nameError ||
    !name ||
    !email ||
    !age ||
    !cellphone ||
    !checkedRisk ||
    !checkedCertificate;

  return (
    <div id="form-wrapper">
      <Card>
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
              error={nameError}
              onChange={({ target }) => {
                const inputtedName = target.value;
                setName(target.value);

                if (inputtedName) {
                  setNameError(false);
                }
              }}
              onBlur={({ target }) => {
                const inputtedName = target.value;

                if (!inputtedName) {
                  setNameError(true);
                }
              }}
              helperText={nameError ? "Insira um nome!" : null}
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

                if (!typedEmail) {
                  setEmailError(true);
                } else {
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
                margin="normal"
              />
              <TextField
                required
                fullWidth
                label="Telefone/Celular"
                placeholder="(99) 99999-9999"
                value={cellphone}
                onKeyDown={(event) => {
                  setCellphone(fillCellphone(event.key, cellphone));
                }}
                margin="normal"
              />
            </div>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={({ target }) => setCheckedRisk(target.checked)}
                  />
                }
                label="Concordo estar ciente acerca dos riscos envolvendo o passeio. *"
              />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={({ target }) =>
                      setCheckedCertificate(target.checked)
                    }
                  />
                }
                label="Concordo estar compromissado em trazer um atestado médico com
                  a permissão de atividades aeróbicas. *"
              />
            </FormGroup>
          </Box>
          <div className="margin-top-div">
            <Tooltip
              title={isBtnDisabled ? "Informações incompletas!" : ""}
              placement="top"
            >
              <span>
                <Button
                  variant="contained"
                  startIcon={<EventAvailableIcon />}
                  disabled={isBtnDisabled}
                >
                  Agendar
                </Button>
              </span>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Form;
