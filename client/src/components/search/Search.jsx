import { useState } from 'react';
import api from '../../http/index.js';
import './style.scss';

// eslint-disable-next-line react/prop-types
export default function Search({ isOpen, closeModal }) {
    const [userName, setUserName] = useState('');
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    async function handleSearch() {
        setLoading(true); 
        try {
            const response = await api.post('http://localhost:8080/api/posts/search', {
                userName,
                keyword
            });
            setResults(response.data); 
        } catch (e) {
            setError('Сталася помилка при пошуку');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal" id="myModal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <h2>Пошук</h2>

                <input
                    type="text"
                    placeholder="Ім'я користувача"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ключове слово"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button className="action-btn" onClick={handleSearch}>
                    Пошук
                </button>

                {loading && <p>Завантаження...</p>}
                {error && <p>{error}</p>}

                {results.length > 0 ? (
                    <div className="search-results">
                        {results.map((post) => (
                            <div key={post._id} className="search-result-item">
                                <div className="post-item__photo">
                                    {post.file ? (
                                        post.file.endsWith(".mp4") ? (
                                            <video
                                                controls
                                                className="post-video"
                                                src={`http://localhost:8080/server/${post.file.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`}
                                                alt="Відео посту"
                                            />
                                        ) : (
                                            <img
                                                src={`http://localhost:8080/server/${post.file.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`}
                                                alt="Зображення посту"
                                                className="post-image"
                                            />
                                        )
                                    ) : (
                                        <div className="image-test">Немає файлу</div>
                                    )}
                                </div>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Немає результатів для вашого пошуку.</p>
                )}
            </div>
        </div>
    );
}
