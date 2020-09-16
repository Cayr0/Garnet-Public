import React, { useState } from "react";
import { View, Text, TextInput, CheckBox } from "react-native";

import styles from "./styles";
import moment from "moment";

const Item = ({ data }) => {
  const [isSelect, setIsSelect] = useState(true);

  const formatD = "DD/MM/YYYY";

  function color(item) {
    if (item == "ATENDIDO") {
      return (
        <Text style={[styles.textStatusSolicitacao, styles.Green]}>
          ATENDIDO
        </Text>
      );
    }
    if (item == "ANDAMENTO") {
      return (
        <Text style={[styles.textStatusSolicitacao, styles.Blue]}>
          ANDAMENTO
        </Text>
      );
    } else {
      return (
        <Text style={[styles.textStatusSolicitacao, styles.Red]}>PENDENTE</Text>
      );
    }
  }

  function periodododia(id) {
    if (id >= 1 && id <= 3) {
      return <Text style={styles.TextTurno}>MANHÃ</Text>;
    } else if (id >= 4 && id <= 6) {
      return <Text style={styles.TextTurno}>TARDE</Text>;
    } else {
      return <Text style={styles.TextTurno}>NOITE</Text>;
    }
  }

  return (
    <View style={styles.ViewDados}>
      <View style={styles.ViewTextHeader}>
        <Text style={styles.TextHeaderDados}>Solicitação</Text>
      </View>

      {color(data.statusSolic)}

      <View style={styles.viewNomeSolicitado}>
        <Text style={styles.textNomeSolicitado}>{data.professor}</Text>
      </View>

      <View style={styles.ViewDadosEditar}>
        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Descrição:</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.TextinputDescri}
              multiline
              editable={false}
            >
              {data.descricao}
            </TextInput>
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Disciplina:</Text>
          <View style={styles.inputDisciplina}>
            <TextInput style={styles.TextinputDisciplina} editable={false}>
              {data.disciplina}
            </TextInput>
          </View>

          <Text style={styles.TextHeaderSolicitacoes}>Disciplina 2:</Text>
          <View style={styles.inputDisciplina}>
            <TextInput style={styles.TextinputDisciplina} editable={false}>
              {data.disciplina2}
            </TextInput>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "100%", flex: 1, paddingRight: "1.5%" }}>
            <Text style={styles.TextHeaderSolicitacoes}>Data:</Text>
            <View style={styles.inputDateSalaQtde}>
              <TextInput style={styles.TextinputDisciplina} editable={false}>
                {moment(data.dataSolicitada).format(formatD)}
              </TextInput>
            </View>
          </View>

          <View style={{ width: "100%", flex: 1, paddingRight: "1.5%" }}>
            <Text style={styles.TextHeaderSolicitacoes}>Sala real:</Text>
            <View style={styles.inputDateSalaQtde}>
              <TextInput style={styles.TextinputDisciplina} editable={false}>
                {data.salaSolic}
              </TextInput>
            </View>
          </View>

          <View style={{ width: "100%", flex: 1 }}>
            <Text style={styles.TextHeaderSolicitacoes}>Qtde de Alunos:</Text>
            <View style={styles.inputDateSalaQtde}>
              <TextInput style={styles.TextinputDisciplina} editable={false}>
                {data.qtdealunos}
              </TextInput>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Observações:</Text>
          <View style={styles.input}>
            <TextInput style={styles.TextinputDescri} multiline>
              {data.observacao}
            </TextInput>
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Horário:</Text>
          <View style={styles.inputViewHorario}>
            <View style={styles.ViewHeaderHorario}>
              <Text style={styles.TextHeaderHorario1}>Turno</Text>
              <Text style={styles.TextHeaderHorario2}>Horário início</Text>
              <Text style={styles.TextHeaderHorario2}>Horário término</Text>
            </View>

            {data.horario &&
              data.horario.map((hora, index) => {
                if (hora.assinado == false) {
                  const horaFormated = hora.hora.split(" ");
                  return (
                    <View style={styles.ViewHorario} key={index}>
                      <View style={styles.ViewTurno}>
                        <CheckBox
                          value={false}
                          disabled={true}
                          onValueChange={setIsSelect}
                        />
                        {periodododia(hora.id)}
                      </View>
                      <View style={styles.ViewDaHora}>
                        <Text style={styles.TextHorario}>
                          {horaFormated[0]}
                        </Text>
                      </View>
                      <View style={styles.ViewDaHora}>
                        <Text style={styles.TextHorario}>
                          {horaFormated[2]}
                        </Text>
                      </View>
                    </View>
                  );
                }
                if (hora.assinado == true) {
                  const horaFormated = hora.hora.split(" ");
                  return (
                    <View style={styles.ViewHorario} key={index}>
                      <View style={styles.ViewTurno}>
                        <CheckBox
                          value={true}
                          disabled={true}
                          onValueChange={setIsSelect}
                        />
                        {periodododia(hora.id)}
                      </View>
                      <View style={styles.ViewDaHora}>
                        <Text style={styles.TextHorario}>
                          {horaFormated[0]}
                        </Text>
                      </View>
                      <View style={styles.ViewDaHora}>
                        <Text style={styles.TextHorario}>
                          {horaFormated[2]}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Recurso:</Text>
          <View style={styles.inputViewRecurso}>
            <View style={styles.ViewHeaderHorario}>
              <Text style={styles.TextHeaderHorario1}>Nome</Text>
              <Text style={[styles.TextHeaderHorario2, styles.TextHeaderRec2]}>
                Quantidade
              </Text>
            </View>
            {data.recursos &&
              data.recursos.map((rec, index) => {
                return (
                  <View style={styles.ViewRec} key={index}>
                    <View style={styles.ViewRecName}>
                      <Text style={styles.TextTurno} numberOfLines={1}>
                        {rec.r}
                      </Text>
                    </View>

                    <View style={styles.ViewRecQt}>
                      <Text style={styles.TextHorario}>{rec.q}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;
