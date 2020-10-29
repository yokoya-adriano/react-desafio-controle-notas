import React from 'react';
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {
  //Inicia - reazliar agrupamentos dos alunos em determinas disciplinas
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currnetGrades = [];
  let id = 1; //para servir como id

  //para percorrer todas as notas
  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currnetGrades,
      });

      currentSubject = grade.subject;
      currnetGrades = [];
    }
    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currnetGrades.push(grade);
  });

  //Após o loop, devemos inserir o último elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currnetGrades,
  });
  //Finaliza - agrupamentos dos alunos em determinas disciplinas

  console.log(tableGrades);

  const handleActionClick = (id, type) => {
    console.log(id);
    console.log(type);
  };

  return (
    <div className="container">
      {tableGrades.map(({ id, grades }) => {
        return (
          <table className="striped" key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            {/* trazer todos os dados para a tabela em tbody, desestruturando
        em grades.map */}
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            onActionClick={handleActionClick}
                            id={id}
                            type={isDeleted ? 'add' : 'edit'}
                          />
                          {!isDeleted && (
                            <Action
                              onActionClick={handleActionClick}
                              id={id}
                              type="delete"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        );
      })}
    </div>
  );
}
