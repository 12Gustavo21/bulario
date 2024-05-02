import { useContext, useState, useEffect, ChangeEvent } from "react";

//libs
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

//services
import { ApiContext } from "../../services/context/index";

//types
import { Medicine } from "../../../types";

//images
import magnifyingGlass from "/magnifyingGlass.svg";

//styles
import "./style.sass";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

// Declara o componente MedicineList como uma função de componente React
const MedicineList: React.FC = () => {

  // Usa o contexto da API para obter medicamentos e status de carregamento
  const { medicines, loading } = useContext(ApiContext);

  // Define estados para a consulta de pesquisa, página atual, medicamentos filtrados e medicamentos ordenados
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [sortedMedicines, setSortedMedicines] = useState<Medicine[]>([]);

  // Obtém a localização atual do componente
  const location = useLocation();

  // Atualiza a página atual com base nos parâmetros da consulta na URL
  useEffect(() => {
    // Converte os parâmetros da consulta em um objeto
    const queryParams = queryString.parse(location.search);
    // Obtém o valor da chave "page" e converte para número
    const page = parseInt(queryParams.page as string) || 1;
    // Atualiza a página atual com o valor obtido
    setCurrentPage(page);
  }, [location.search]);

  // Atualiza o estado da página atual no armazenamento local
  useEffect(() => {
    // Salva o valor da página atual no armazenamento local
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  // Ordena os medicamentos por data de publicação quando a lista de medicamentos é atualizada
  useEffect(() => {
    // Ordena os medicamentos por data de publicação em ordem decrescente
    const sorted = [...medicines].sort((a, b) => {
      // Converte as datas de publicação em milissegundos
      const dateA = new Date(a.published_at).getTime();
      const dateB = new Date(b.published_at).getTime();
      // Retorna a diferença entre as datas
      return dateB - dateA;
    });
    // Atualiza o estado dos medicamentos ordenados
    setSortedMedicines(sorted as Medicine[]);
  }, [medicines]);


  // Filtra os medicamentos com base na consulta de pesquisa e medicamentos ordenados
  useEffect(() => {
    // Filtra os medicamentos com base no nome e fabricante
    const filtered = sortedMedicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query) ||
        medicine.company.toLowerCase().includes(query)
    );
    setFilteredMedicines(filtered);
  }, [query, sortedMedicines]);


  // Inicializa a biblioteca AOS
  useEffect(() => {
    AOS.init();
  });

  // Manipula a pesquisa de medicamentos conforme o usuário digita
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setQuery(keyword);
  };

  // Define o número de itens por págin
  const itemsPerPage = 10;

  // Atualiza a página atual quando o usuário clica na paginação
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Gera a URL da página com base no número da página
  const generatePageUrl = (page: number) => {
    // Converte o número da página em parâmetros de consulta
    const queryParams = queryString.stringify({ page });
    return `?${queryParams}`;
  };

  // Calcula o índice do último item na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calcula o índice do primeiro item na página atual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtém os medicamentos da página atual
  const currentItems = filteredMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Retorna o carregamento enquanto os medicamentos estão sendo carregados
  if (loading) return <div className="loading"></div>;

  return (
    <section className="medicine__list">
      <div className="search__bar" data-aos="fade-up" data-aos-duration="2000">
        <img src={magnifyingGlass} alt="Search" />
        <input
          type="text"
          placeholder="Pesquise pelo nome ou fabricante"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {filteredMedicines.length > itemsPerPage && (
        <section
          className="pagination"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {Array(Math.ceil(filteredMedicines.length / itemsPerPage))
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
              >
                <button onClick={() => paginate(index + 1)}>
                  <Link to={generatePageUrl(index + 1)}>{index + 1}</Link>
                </button>
              </div>
            ))}
        </section>
      )}

      {currentItems.length === 0 ? (
        <section
          className="no__results"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <p>No results found for "{query}".</p>
        </section>
      ) : (
        currentItems.map((medicine) => (
          <Link
            to={`/medicine/${medicine.id}`}
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            <section key={medicine.id} className="medicine__card">
              <p>
                {medicine.name} <span>({medicine.company})</span>
              </p>
            </section>
          </Link>
        ))
      )}
    </section>
  );
};

export default MedicineList;
