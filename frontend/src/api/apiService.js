//axios -> biblioteca externa (instalado via yarn add axios)
import axios from 'axios';

//para simplificar o acesso a URL do host do backend
const API_URL = 'http://localhost:3001/grade';

//*GRADE_VALIDATION* vai guardar uma funcionalidade que o backend não tem
//no caso caso do exercício para validar uma nota.
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios', //referenciado do app.js no backend
    minValue: 0,
    maxValue: 10, //referenciado do app.js no backend
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático', //referenciado do app.js no backend
    minValue: 0,
    maxValue: 40, //referenciado do app.js no backend
  },
  {
    id: 3,
    gradeType: 'Desafio', //referenciado do app.js no backend
    minValue: 0,
    maxValue: 50, //referenciado do app.js no backend
  },
];

async function getAllGrades() {
  const res = await axios.get(API_URL); //Trazer os dados da API

  //Para trazer apenas o data(grades) da API
  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade; //desestruturando os dados em grade
    return {
      ...grade, //trazendo todo o array data
      studentLowerCase: student.toLowerCase(), //criando com lowercase
      subjectLowerCase: subject.toLowerCase(), //criando com lowercase
      typeLowerCase: type.toLowerCase(), //criando com lowercase
      isDeleted: false,
    };
  });

  let allStudents = new Set(); //Set -> estrutura do JS que simula um conjunto
  //para 'percorrer' todo o API e retirar itens repetidos por conta do Set();
  grades.forEach((grade) => allStudents.add(grade.student)); //percorrer o vetor de grades
  allStudents = Array.from(allStudents); //transformar de Set para Array

  let allSubjects = new Set();
  grades.forEach((grade) => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  let allGradesTypes = new Set();
  grades.forEach((grade) => allGradesTypes.add(grade.type));
  allGradesTypes = Array.from(allGradesTypes);

  const allCombinations = []; //iniciar combinação entre os três
  allStudents.forEach((student) => {
    allSubjects.forEach((subject) => {
      allGradesTypes.forEach((type) => {
        allCombinations.push({ student, subject, type });
      });
    });
  });

  allCombinations.forEach(({ student, subject, type }) => {
    //destruturação no parâmetro. pegar todas combinações de
    //alunos, disciplina e tipos de notas e verificar se
    //algum deles não está na API
    const hasItem = grades.find((grade) => {
      grade.subject =
        subject && grade.student === student && grade.type === type;
    });

    if (!hasItem) {
      //se eu não tenho o item (ele foi excluído no backend)
      //e precisa ser gerado um elemento de frontEnd
      grades.push({
        //inserir a nota que falta
        id: grades.length + 1,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true, //mostra se a nota está excluída e faz uma inserção
        //indicando que ela foi excluída logicamente para aparecer na tela
        //com '-' que representa que falta a nota e necessita ser adicionada
      });
    }
  });

  return allCombinations;
}

export { getAllGrades };
