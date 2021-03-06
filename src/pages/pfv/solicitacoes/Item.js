import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";

import styles from "./styles";

const Item = ({ item }) => {
  const { navigate } = useNavigation();

  const formatD = "DD/MM/YYYY";
  const formatH = "HH:mm";

  function tempoHora(item) {
    const horaformatada = item.map((hora) => {
      if (hora.assinado == true) {
        switch (hora.id) {
          case 1:
            return `MANHÃ ${hora.hora} \n`;
            break;
          case 2:
            return `MANHÃ ${hora.hora} \n`;
            break;
          case 3:
            return `MANHÃ ${hora.hora} \n`;
            break;
          case 4:
            return `TARDE ${hora.hora} \n`;
            break;
          case 5:
            return `TARDE ${hora.hora} \n`;
            break;
          case 6:
            return `TARDE ${hora.hora} \n`;
            break;
          case 7:
            return `NOITE ${hora.hora} \n`;
            break;
          case 8:
            return `NOITE ${hora.hora} \n`;
            break;
          default:
            break;
        }
      }
    });
    return horaformatada;
  }

  function color(item) {
    if (item == "ATENDIDO") {
      return <View style={styles.CircleGreen} />;
    }
    if (item == "ANDAMENTO") {
      return <View style={styles.CircleBlue} />;
    } else {
      return <View style={styles.CircleRed} />;
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("EditarSolicitacaoPFV", { itemId: item });
      }}
      style={styles.flatList}
    >
      <View style={styles.ViewDisciplinas}>
        <Text style={styles.textDisciplinas}>Disciplina:</Text>
        <Text style={styles.textNomeDisciplinas}>{item.disciplina}</Text>
      </View>

      <View style={styles.ViewRecurso}>
        <View>
          <Text style={styles.textRecurso}>Recursos:</Text>

          {item.recsolicitado &&
            item.recsolicitado.map((rec, index) => {
              return (
                <Text
                  key={index}
                  style={[styles.textRecurso, styles.textNRecurso]}
                >
                  {rec.r}
                </Text>
              );
            })}
        </View>
      </View>

      <View style={styles.ViewHorario}>
        <View>
          <Text style={styles.textHorario}>Horário:</Text>
          <Text style={styles.textNomeHorario}>{tempoHora(item.horario)}</Text>
        </View>
        <View>
          <Text style={styles.textDate}>Data para reserva:</Text>
          <Text style={[styles.textRecurso, styles.textNRecurso]}>
            {moment(item.data).format(formatD)}
          </Text>
        </View>
      </View>

      <View style={styles.ViewStts}>
        <Text style={styles.textStts}>Status:</Text>
        <View style={styles.ViewNomeStts}>
          <View>{color(item.completed)}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
