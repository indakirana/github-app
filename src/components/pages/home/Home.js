import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../ui/User";

const Home = () => {

    const [query, setQuery] = useState("");
    //users fetched from the API
    const [users, setUsers] = useState([]);
    //page
    const [page, setPage] = useState(1);
    //per page
    const [limit, setLimit] = useState(10);

    const handleQueryInput = (e) => {
        const value = e.target.value;
        setQuery(value);
    }

    const handlePrevPage = () => {
        setPage(page => {
            if(page === 1) return page;
            else return page - 1;
        })
    }

    const handleNextPage = () => {
        setPage(page => page + 1);
    }

    const handlePageLimit = (e) => {
        const value = e.target.value;
        setLimit(parseInt(value));
    }

    const fetchUsers = async () => {
        try {
            const {data} = await axios.get("/search/users?q=" + query, {
                params: {
                    page,
                    per_page: limit
                }
            });
            return data?.items;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const handleSearchUsers = async (e) => {
        e.preventDefault();
        if (query) {
            const items = await fetchUsers();
            setUsers(items);
        }
        else {
            console.log("your query is empty..");
        }
    }

    useEffect(() => {
        const displayUsersOnChange = async () => {
            if(query) {
                const items = await fetchUsers();
                setUsers(items);
            }
        }
        displayUsersOnChange();
    }, [page,limit]);

    return (
        <div className="container">
            <div className="search-form">
                <h3>Github Search User</h3>
                <form>
                    <input value= {query} onChange= {handleQueryInput} type="text" />
                    <button onClick= {handleSearchUsers} > Search </button>
                </form>
            </div>
            <div className="search-results">
                <div className="more-options">
                    <label>
                        <small>view per page</small>
                        <select onChange={handlePageLimit}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                    <div className="pagination">
                        <button onClick={handlePrevPage}> {page} </button>
                        <button onClick={handleNextPage}> {page+1} </button>
                    </div>
                </div>
                { users ? (
                    users.map( (user) => {
                        return <User user={user} key={user.id} />
                    })
                ) : (
                    <h2>there is nothing to display.. </h2>
                )}
                
            </div>
        </div>
    )
}

export default Home;