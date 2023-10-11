import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchMenu() {
    let { searchTerm } = useParams();

    const [searchresults, setResult] = useState( [] );

    useEffect( () => {
        const fetchSearchResults = async () => {
          try{
            const urlHI = `/api/MenuController/searchBar/${searchTerm}`;
            const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlHI));
            setResult(res.data);
          }catch(err){
            console.log(err);
          }
        }
        fetchSearchResults()
      }, [searchTerm]);

  return (
    <div>
        <h1>Search results for '{searchTerm}'</h1>

      {searchresults.length === 0 ? (
        <p>No such items</p>
      ) : (
        <table style={{marginLeft: "10px"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Calories</th>
            <th>Ingredients</th>
            <th>Veg</th>
            <th>Vegan</th>
            <th>Non-Veg</th>
          </tr>
        </thead>
        <tbody>
          {searchresults.map(eachItem => (
            <tr key={eachItem.menu_id}>
              <td>{eachItem.name}</td>
              <td>{eachItem.category}</td>
              <td>{eachItem.description}</td>
              <td>{eachItem.price}</td>
              <td>{eachItem.calories}</td>
              <td>{eachItem.ingredients}</td>
              <td>{eachItem.is_veg}</td>
              <td>{eachItem.is_vegan}</td>
              <td>{eachItem.is_nonveg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

     
    </div>
  )
}

export default SearchMenu;