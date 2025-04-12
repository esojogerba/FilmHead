(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&d(t)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();const m="f5a1b79a0e1239f11fcfede56821ff08",n="http://image.tmdb.org/t/p/",g=function(l,i,c,d,e){fetch(l).then(s=>s.json()).then(s=>i(s,c,d,e))};function v(l,i,c,d){if(l=="movie"){const{poster_path:e,title:s,genre_ids:t,release_date:o,id:r}=i,a=document.createElement("div");return a.classList.add("media-card"),a.innerHTML=`
            <figure class="poster-box card-poster">
                <img
                    src="${e!=null?n+"w342"+e:"#"}"
                    alt="${s}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="media-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">
                ${s}
            </h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${o.split("-")[0]}</div>
                </div>
            </div>

            <p class="media-card-genres">
                ${c.asString(t)}
            </p>

            <a
                href="movie-details.html?movieId=${r}"
                class="card-btn"
                title="${s}"
                onclick="getMovieDetails(${r})"
            ></a>
        `,a}else if(l=="show"){const{poster_path:e,name:s,first_air_date:t,genre_ids:o,id:r}=i,a=document.createElement("div");return a.classList.add("media-card"),a.innerHTML=`
            <figure class="poster-box card-poster">
                <img
                    src="${e!=null?n+"w342"+e:"#"}"
                    alt="${s}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="media-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">
                ${s}
            </h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${t.split("-")[0]}</div>
                </div>
            </div>

            <p class="media-card-genres">
                ${c.asString(o)}
            </p>

            <a
                href="show-details.html?showId=${r}"
                class="card-btn"
                title="${s}"
                onclick="getShowDetails(${r})"
            ></a>
        `,a}else if(l=="grid-movie"){const{poster_path:e,title:s,genre_ids:t,release_date:o,id:r}=i,a=document.createElement("div");return a.classList.add("grid-card"),a.innerHTML=`
            <figure class="poster-box grid-card-poster">
                <img
                    src="${e!=null?n+"w342"+e:"#"}"
                    alt="${s}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="grid-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="grid-card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">${s}</h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${o.split("-")[0]}</div>
                </div>
            </div>

            <a 
            href="${d=="home"?`/html/movie-details.html?movieId=${r}`:`movie-details.html?movieId=${r}`}"  
            class="card-btn" title="" onclick="getMovieDetails(${r})"></a>
        `,a}else if(l=="grid-tv"){const{poster_path:e,name:s,first_air_date:t,genre_ids:o,id:r}=i,a=document.createElement("div");return a.classList.add("grid-card"),a.innerHTML=`
            <figure class="poster-box grid-card-poster">
                <img
                    src="${e!=null?n+"w342"+e:"#"}"
                    alt="${s}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="grid-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="grid-card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">${s}</h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${t.split("-")[0]}</div>
                </div>
            </div>

            <a 
            href="${d=="home"?`/html/show-details.html?showId=${r}`:`show-details.html?showId=${r}`}" 
            class="card-btn" title="" onclick="getShowDetails(${r})"></a>
        `,a}}function u(){const l=Array.prototype.slice.call(document.getElementsByClassName("search-field")),i=document.createElement("div");i.classList.add("search-modal"),document.querySelector("main").appendChild(i);const c=document.querySelector(".transition");let d;l.forEach(e=>{e.addEventListener("input",function(){if(!e.value.trim()){i.classList.remove("active"),clearTimeout(d),c.classList.remove("is-active");return}clearTimeout(d),c.classList.add("is-active"),d=setTimeout(()=>{g(`https://api.themoviedb.org/3/search/multi?api_key=${m}&query=${e.value}&include_adult=false&language=en-US&page=1`,function({results:s}){i.classList.add("active"),i.innerHTML=`
                            <section class="media-grid container">
                                <div class="grid-header">
                                    <svg class="material-icon" id="grid-search-svg">
                                        <use
                                            xlink:href="/assets/images/icons.svg#search-icon"
                                        />
                                    </svg>
                                    <h1 class="grid-title">${e.value}</h1>
                                </div>
            
                                <div class="grid-list">
                                </div>
                            </section>
                        `;for(const t of s)if(t.media_type=="movie"||t.media_type=="tv"){const o=v(`grid-${t.media_type}`,t,"","home");i.querySelector(".grid-list").appendChild(o)}c.classList.remove("is-active")})},500)})})}u();
