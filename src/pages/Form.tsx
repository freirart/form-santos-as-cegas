import React, { useState } from "react";
import moment from "moment";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DatePicker } from "@mui/lab";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import {
  fillAge,
  fillEmail,
  fillCellphone,
  isCellphoneCorrect,
  isoDateMask,
} from "../helpers/formHelper";

import cardHeaderImg from "../assets/images/santos-as-cegas-form-header.jpg";

import "./styles.css";

const comparisonDate = moment(
  moment().add(1, "day").format(isoDateMask),
  isoDateMask
);

function Form() {
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [checkedRisk, setCheckedRisk] = useState(false);
  const [checkedCertificate, setCheckedCertificate] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [nameError, setNameError] = useState<undefined | boolean>(undefined);
  const [emailError, setEmailError] = useState<undefined | boolean>(undefined);
  const [ageError, setAgeError] = useState<undefined | boolean>(undefined);
  const [cellphoneError, setCellphoneError] = useState<undefined | boolean>(
    undefined
  );
  const [dateError, setDateError] = useState<undefined | boolean>(undefined);

  const areFieldsFilled =
    emailError !== undefined &&
    !emailError &&
    nameError !== undefined &&
    !nameError &&
    ageError !== undefined &&
    !ageError &&
    cellphoneError !== undefined &&
    !cellphoneError;

  const areChecksChecked = checkedRisk && checkedCertificate;

  const isBtnDisabled =
    !areFieldsFilled ||
    !areChecksChecked ||
    dateError ||
    dateError === undefined;

  const handleDate = ({ target }: any) => {
    const inputtedDate = target?.value;
    const momentDate = moment(inputtedDate, "DD/MM/YYYY");

    setDateError(
      !inputtedDate || !momentDate.isValid() || momentDate < comparisonDate
    );
  };

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

          <div className="margin-top-div">
            <Stack spacing={3}>
              <TextField
                required
                label="Nome completo"
                fullWidth
                placeholder="Renato Frosch"
                value={name}
                error={nameError}
                onChange={({ target }) => {
                  const inputtedName = target.value;
                  setName(inputtedName);

                  setNameError(!inputtedName);
                }}
                onBlur={({ target }) => {
                  const inputtedName = target.value;

                  if (!inputtedName) {
                    setNameError(true);
                  }
                }}
                helperText={nameError ? "Insira um nome!" : " "}
              />
              <TextField
                required
                fullWidth
                label="Seu melhor e-mail"
                value={email}
                error={emailError}
                placeholder="santosascegas@gmail.com"
                onChange={({ target }) => {
                  const typedEmail = target.value;

                  setEmail(typedEmail);
                  setEmailError(fillEmail(typedEmail));
                }}
                onBlur={({ target }) => {
                  const typedEmail = target.value;

                  if (!typedEmail) {
                    setEmailError(true);
                  } else {
                    setEmailError(fillEmail(typedEmail));
                  }
                }}
                helperText={emailError ? "Insira com um e-mail válido!" : " "}
              />
              <div className="nowrap-div">
                <TextField
                  required
                  label="Idade"
                  placeholder="18"
                  fullWidth
                  value={age}
                  error={ageError}
                  onChange={({ target }) => {
                    const inputtedAge = target.value;

                    setAge(fillAge(inputtedAge));
                    setAgeError(!inputtedAge);
                  }}
                  helperText={ageError ? "Insira uma idade!" : " "}
                  onBlur={({ target }) => setAgeError(!target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Telefone/Celular"
                  placeholder="(99) 99999-9999"
                  value={cellphone}
                  error={cellphoneError}
                  onChange={({ target }) => {
                    const typedCellphone = target.value;

                    setCellphone(fillCellphone(typedCellphone, cellphone));

                    setCellphoneError(!isCellphoneCorrect(typedCellphone));
                  }}
                  onBlur={({ target }) =>
                    setCellphoneError(!isCellphoneCorrect(target.value))
                  }
                  helperText={
                    cellphoneError ? "Insira um telefone/celular válido!" : " "
                  }
                />
              </div>

              <DatePicker
                renderInput={(props) => {
                  return (
                    <TextField
                      {...props}
                      required
                      error={dateError}
                      helperText={
                        dateError ? "Entre com uma data válida!" : " "
                      }
                      onChange={handleDate}
                      onBlur={handleDate}
                    />
                  );
                }}
                label="Data do passeio"
                value={selectedDate}
                minDate={moment()}
                onChange={(newValue) => setSelectedDate(newValue)}
                inputFormat="DD/MM/YYYY"
                shouldDisableDate={(date) => date < comparisonDate}
                onAccept={() => {
                  if (dateError) {
                    setDateError(false);
                  }
                }}
              />
            </Stack>
          </div>

          <div className="margin-top-div">
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
          </div>

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
                  onClick={() => setDialogOpen(true)}
                >
                  Agendar
                </Button>
              </span>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="responsive-dialog-title">
          [MOCK] O seu pedido de agendamento foi enviado com sucesso!{" "}
          <span aria-label="Apaixonado" role="img">
            😍
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Em breve você receberá um e-mail de confirmação com os dados aqui
            informados com a respectiva resposta do agendamento.
          </DialogContentText>
          <br />
          <DialogContentText>
            Não esqueça de checar a caixa de spam para ficar ligado na situação
            do seu pedido!{" "}
            <span aria-label="Apaixonado" role="img">
              😉
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
