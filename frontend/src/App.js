import React, { useEffect, useState } from 'react';

import * as api from './api/apiService';
import GradesControl from './components/GradesControl';
import Spinner from './components/Spinner';

export default function App() {
  //todas as notas do back
  const [allGrades, setAllGrades] = useState([]);
  //nota que o usuário escolheu para editar
  const [selectedGrade, setSelectedGrade] = useState({});
  //começando com false para optar em abrir ou não o modal
  const [isModal, setIsModal] = useState(false);

  //Effect para trazer os dados da api
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 1000);
    };
    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });
    getGrades();
  }, []);

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;
      setAllGrades(newGrades);
    }
  };

  const handlePersist = () => {
    console.log('handleDelete');
  };

  return (
    <div>
      <h1 className="center">Controle de notas</h1>
      {allGrades.length == 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}
