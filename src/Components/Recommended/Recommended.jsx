import React, { useEffect, useState } from 'react';
import './Recommended.css';
import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { API_KEY } from '../../data';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    if (!categoryId) {
      console.error("categoryId is undefined");
      return;
    }

    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(relatedVideo_url);
      const data = await response.json();
      console.log("Fetched data:", data);
      setApiData(data.items || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='recommended'>
      {apiData.length > 0 ? (
        apiData.map((item, index) => {
          const { snippet, statistics } = item;
          const { title, channelTitle, thumbnails } = snippet;
          const thumbnailUrl = thumbnails?.medium?.url || thumbnail1; // Use default thumbnail if API doesn't provide one

          return (
            <div key={index} className="side-video-list">
              <img
                src={thumbnailUrl}
                alt={title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = thumbnail1;
                }}
              />
              <div className="vid-info">
                <h4>{title}</h4>
                <p>{channelTitle}</p>
                <p>{statistics?.viewCount} Views</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No recommended videos available.</p>
      )}
    </div>
  );
};

export default Recommended;

