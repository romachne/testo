import './App.css';
import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import Info from "./Info/Info";
import Table from "./Table/Table";
import Search from "./Search/Search";
import Form from "./Form/Form";

const App = () => {
  const [sortField, setSortField] = useState({key: null, direction: null});
  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [row, setRow] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');


  // Сортировка
  const requestSort = key => {
    let direction = "asc";
    if (sortField.key === key && sortField.direction === "asc") {
      direction = "desc";
    }
    setSortField({ key, direction });
  };

  useMemo(() => {
    if (sortField !== null) {
      return data.sort((a, b) => {
        if (a[sortField.key] < b[sortField.key]) {
          return sortField.direction === 'asc' ? -1 : 1;
        }
        if (a[sortField.key] > b[sortField.key]) {
          return sortField.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }, [data, sortField]);

  const getClassNamesFor = name => {
    if (!sortField) {
      return;
    }
    return sortField.key === name ? sortField.direction : undefined;
  };



  // Вывод доп. информации
  const onRowSelect = item => {
    setRow(item)
  };



  // Выбор массива данных
  const onSelect = link => {
    fetch(link)
      .then(response => response.json())
      .then(
        (result) => {
          setData(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setIsSelected(true);
  };



  // Пагинация
  const handlePageClick = ({selected}) => {
    setPage(selected);
  };



  //Фильтрация
  const onSearch = (string) => {
    setSearch(string);
  }

  const getFilteredData = () => {
    if (!search) {
      return data
    }

    let fd = data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
        || item['id'].toString().includes(search)
        || item['phone'].toString().includes(search)
    })

    if (fd.length > 0) {
      return fd
    } else {
      alert('Таких данных нет')
      return data
    }
  }



  // Отправка формы
  const onSubmit = (id, firstName, lastName, email, phone) => {
    data.unshift({id: id, firstName: firstName, lastName: lastName, email: email, phone: phone})
    requestSort()
  }


  // Вывод готовой таблицы
  const pageSize = 50;

  // разделяем данные по страницам
  const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
  };

  const filteredData = getFilteredData()
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const displayData = chunk(filteredData, pageSize)[page];



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isSelected) {
    return (
      <div>
        <button onClick={() => onSelect('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')}>маленькие</button>
        <button onClick={() => onSelect('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')}>большие</button>
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Search onSearch={onSearch} />
        <hr />
        <Form onSubmit={onSubmit} />
        <hr />
        <Table
          data={displayData}
          requestSort={requestSort}
          getClassNamesFor={getClassNamesFor}
          onRowSelect={onRowSelect}
        />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />

        {row ? <Info row={row} /> : null}
      </div>
    )
  }
}

export default App;
