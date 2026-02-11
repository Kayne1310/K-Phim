Dự án dùng NextJs:14 làm FE

Base URL:

https://ophim1.com
Định dạng dữ liệu:

JSON
Mã hóa:

UTF-8
Phương thức HTTP:

GET


API PHIM TRANG CHỦ
curl --request GET \
  --url https://ophim1.com/v1/api/home \
  --header 'accept: application/json'


  {
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Xem phim online miễn phí",
      "descriptionHead": "Xem phim online chất lượng cao miễn phí"
    },
    "items": [
      {
        "_id": "66f8e123456789abcdef",
        "name": "Tên phim",
        "slug": "ten-phim",
        "origin_name": "Original Name",
        "alternative_names": ["Tên khác 1", "Tên khác 2"],
        "type": "series",
        "thumb_url": "https://example.com/thumb.jpg",
        "poster_url": "https://example.com/poster.jpg",
        "year": 2024,
        "category": [
          {
            "id": "action",
            "name": "Hành động",
            "slug": "hanh-dong"
          }
        ],
        "country": [
          {
            "id": "us",
            "name": "Mỹ",
            "slug": "my"
          }
        ]
      }
    ],
    "params": {
      "pagination": {
        "currentPage": 1,
        "totalItems": 100,
        "totalItemsPerPage": 24
      }
    },
    "APP_DOMAIN_CDN_IMAGE": "https://img.ophim.cc/uploads/movies/",
    "APP_DOMAIN_FRONTEND": "https://ophim1.com"
  }
}




API:DanhSachPhim(Bộ lọc)



curl --request GET \
  --url https://ophim1.com/v1/api/danh-sach/[slug] \
  --header 'accept: application/json'

  slug
Bắt buộc
string[phim-moi | phim-bo | phim-le | tv-shows | hoat-hinh | phim-vietsub | phim-thuyet-minh | phim-long-tien | phim-bo-dang-chieu | phim-bo-hoan-thanh | phim-sap-chieu | subteam | phim-chieu-rap]
Slug của danh sách phim cụ thể

Ví dụ:

phim-chieu-rap
page
Tùy chọn
number
Số trang (mặc định: 1)

Ví dụ:

1
limit
Tùy chọn
number
Số lượng phim trên mỗi trang (mặc định: 24)

Ví dụ:

24
sort_field
Tùy chọn
string[modified.time | year | _id]
Trường sắp xếp

Ví dụ:

modified.time
sort_type
Tùy chọn
string[desc | asc]
Kiểu sắp xếp

Ví dụ:

desc
category
Tùy chọn
string
Lọc theo một hoặc nhiều thể loại

Ví dụ:

hanh-dong,tinh-cam
country
Tùy chọn
string
Lọc theo một hoặc nhiều quốc gia

Ví dụ:

trung-quoc,han-quoc
year
Tùy chọn
string
Lọc theo năm sản xuất

Ví dụ:

2026

  {
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Danh sách phim mới",
      "descriptionHead": "Xem phim mới nhất được cập nhật"
    },
    "titlePage": "Phim mới",
    "breadCrumb": [
      {
        "name": "Trang chủ",
        "slug": "",
        "isCurrent": false
      },
      {
        "name": "Phim mới",
        "isCurrent": true
      }
    ],
    "items": [...],
    "params": {
      "pagination": {
        "currentPage": 1,
        "totalItems": 100,
        "totalItemsPerPage": 24,
        "totalPages": 5
      }
    }
  }
}



API:ChiTietPhim

curl --request GET \
  --url https://ophim1.com/v1/api/tim-kiem?keyword=[keyword] \
  --header 'accept: application/json'

  keyword
Bắt buộc
string
Từ khóa tìm kiếm (tối thiểu 2 ký tự)

Ví dụ:

avengers
page
Tùy chọn
number
Số trang (mặc định: 1)

Ví dụ:

1
limit
Tùy chọn
number
Số lượng phim trên mỗi trang (mặc định: 24)

Ví dụ:

24


{
  "status": "success",
  "message": "Tìm kiếm thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Tìm kiếm: avengers",
      "descriptionHead": "Kết quả tìm kiếm cho từ khóa 'avengers'"
    },
    "titlePage": "Tìm kiếm: avengers",
    "breadCrumb": [
      {
        "name": "Trang chủ",
        "slug": "",
        "isCurrent": false
      },
      {
        "name": "Tìm kiếm",
        "isCurrent": true
      }
    ],
    "items": [...],
    "params": {
      "keyword": "avengers",
      "pagination": {
        "currentPage": 1,
        "totalItems": 15,
        "totalItemsPerPage": 20,
        "totalPages": 1
      }
    }
  }
}


API:Danh sách thể loại

curl --request GET \
  --url https://ophim1.com/v1/api/the-loai \
  --header 'accept: application/json'


  {
  "status": "success",
  "data": [
    { "_id": "...", "slug": "hanh-dong", "name": "Hành động" },
    { "_id": "...", "slug": "tinh-cam", "name": "Tình cảm" }
  ]



API:  Phim theo thể loại


curl --request GET \
  --url https://ophim1.com/v1/api/the-loai/[slug] \
  --header 'accept: application/json'


  slug
Bắt buộc
string
Slug của thể loại phim cụ thể

Ví dụ:

hanh-dong
page
Tùy chọn
number
Số trang (mặc định: 1)

Ví dụ:

1
limit
Tùy chọn
number
Số lượng phim trên mỗi trang (mặc định: 24)

Ví dụ:

24
sort_field
Tùy chọn
string[modified.time | year | _id]
Trường sắp xếp

Ví dụ:

modified.time
sort_type
Tùy chọn
string[desc | asc]
Kiểu sắp xếp

Ví dụ:

desc
country
Tùy chọn
string
Lọc theo một hoặc nhiều quốc gia

Ví dụ:

trung-quoc,han-quoc
year
Tùy chọn
string
Lọc theo năm sản xuất

Ví dụ:

2026


{
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Danh sách phim hành động",
      "descriptionHead": "Xem phim hành động được cập nhật"
    },
    "titlePage": "Phim hành động",
    "breadCrumb": [
      {
        "name": "Trang chủ",
        "slug": "",
        "isCurrent": false
      },
      {
        "name": "Phim hành động",
        "isCurrent": true
      }
    ],
    "items": [...],
    "params": {
      "pagination": {
        "currentPage": 1,
        "totalItems": 100,
        "totalItemsPerPage": 24,
        "totalPages": 5
      }
    }
  }
}


API: Danh sách quốc gia

curl --request GET \
  --url https://ophim1.com/v1/api/quoc-gia \
  --header 'accept: application/json'

  {
  "status": "success",
  "data": [
    { "_id": "...", "slug": "han-quoc", "name": "Hàn Quốc" },
    { "_id": "...", "slug": "trung-quoc", "name": "Trung Quốc" }
  ]
}


API:Phim theo quốc gia (bộ lọc)

curl --request GET \
  --url https://ophim1.com/v1/api/quoc-gia/[slug] \
  --header 'accept: application/json'

  /v1/api/quoc-gia/[slug]
Phương thức
GET
Mô tả
API để lấy danh sách phim theo quốc gia với các tiêu chí lọc như thể loại, năm sản xuất, v.v.

slug
Bắt buộc
string
Slug của quốc gia phim cụ thể

Ví dụ:

han-quoc
page
Tùy chọn
number
Số trang (mặc định: 1)

Ví dụ:

1
limit
Tùy chọn
number
Số lượng phim trên mỗi trang (mặc định: 24)

Ví dụ:

24
sort_field
Tùy chọn
string[modified.time | year | _id]
Trường sắp xếp

Ví dụ:

modified.time
sort_type
Tùy chọn
string[desc | asc]
Kiểu sắp xếp

Ví dụ:

desc
year
Tùy chọn
string
Lọc theo năm sản xuất

Ví dụ:

2026


{
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Danh sách phim hàn quốc",
      "descriptionHead": "Xem phim hàn quốc được cập nhật"
    },
    "titlePage": "Phim hàn quốc",
    "breadCrumb": [
      {
        "name": "Trang chủ",
        "slug": "",
        "isCurrent": false
      },
      {
        "name": "Phim hàn quốc",
        "isCurrent": true
      }
    ],
    "items": [...],
    "params": {
      "pagination": {
        "currentPage": 1,
        "totalItems": 100,
        "totalItemsPerPage": 24,
        "totalPages": 5
      }
    }
  }
}


API:Danh sách năm phát hành
curl --request GET \
  --url https://ophim1.com/v1/api/nam-phat-hanh \
  --header 'accept: application/json'

  Endpoint
/v1/api/nam-phat-hanh
Phương thức
GET
Mô tả
API để lấy danh sách tất cả các năm phát hành phim.

{
  "status": "success",
  "data": [
    { "_id": "...", "slug": "2025", "name": "2025" },
    { "_id": "...", "slug": "2024", "name": "2024" },
    { "_id": "...", "slug": "2023", "name": "2023" }
  ]
}


API: Phim theo năm phát hành (bộ lọc)
curl --request GET \
  --url https://ophim1.com/v1/api/nam-phat-hanh/[year] \
  --header 'accept: application/json'


  Endpoint
/v1/api/nam-phat-hanh/[year]
Phương thức
GET
Mô tả
API để lấy danh sách phim theo năm phát hành với các tiêu chí lọc như thể loại, quốc gia, v.v.

year
Bắt buộc
string
Năm phát hành cụ thể

Ví dụ:

2025
page
Tùy chọn
number
Số trang (mặc định: 1)

Ví dụ:

1
limit
Tùy chọn
number
Số lượng phim trên mỗi trang (mặc định: 24)

Ví dụ:

24
sort_field
Tùy chọn
string[modified.time | year | _id]
Trường sắp xếp

Ví dụ:

modified.time
sort_type
Tùy chọn
string[desc | asc]
Kiểu sắp xếp

Ví dụ:

desc
category
Tùy chọn
string
Lọc theo một hoặc nhiều thể loại

Ví dụ:

hanh-dong,tinh-cam
country
Tùy chọn
string
Lọc theo một hoặc nhiều quốc gia

Ví dụ:

han-quoc,trung-quoc


{
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "seoOnPage": {
      "titleHead": "Danh sách phim năm 2025",
      "descriptionHead": "Xem phim năm 2025 được cập nhật"
    },
    "titlePage": "Phim năm 2025",
    "breadCrumb": [
      {
        "name": "Trang chủ",
        "slug": "",
        "isCurrent": false
      },
      {
        "name": "Phim năm 2025",
        "isCurrent": true
      }
    ],
    "items": [...],
    "params": {
      "pagination": {
        "currentPage": 1,
        "totalItems": 100,
        "totalItemsPerPage": 24,
        "totalPages": 5
      }
    }
  }
}


API:Thông tin phim

curl --request GET \
  --url https://ophim1.com/v1/api/phim/[slug] \
  --header 'accept: application/json'

  slug
Bắt buộc
string
Slug của phim

Ví dụ:

tro-choi-con-muc

{
  "status": "success",
  "message": "Lấy dữ liệu thành công",
  "data": {
    "item": {
      "_id": "66f8e123456789abcdef",
      "name": "Trò Chơi Con Mực",
      "slug": "tro-choi-con-muc",
      "origin_name": "Trò Chơi Con Mực",
      "alternative_names": ["Trò Chơi Con Mực", "Trò Chơi Con Mực 2"],
      "content": "Mô tả nội dung phim...",
      "type": "single",
      "status": "completed",
      "thumb_url": "/thumb.jpg",
      "poster_url": "/poster.jpg",
      "trailer_url": "https://youtube.com/watch?v=xyz",
      "time": "181 phút",
      "episode_current": "Full",
      "episode_total": "1",
      "quality": "HD",
      "lang": "Vietsub",
      "lang_key": ["vs", "tm"],
      "year": 2019,
      "view": 1000000,
      "actor": ["Robert Downey Jr.", "Chris Evans"],
      "director": ["Anthony Russo", "Joe Russo"],
      "category": [...],
      "country": [...],
      "episodes": [
        {
          "server_name": "VIP",
          "is_ai": false,
          "server_data": [
            {
              "name": "Full",
              "slug": "full",
              "filename": "tro-choi-con-muc-full",
              "link_embed": "https://player.example.com/embed/xyz",
              "link_m3u8": "https://example.com/video.m3u8"
            }
          ]
        }
      ],
      "tmdb": {
        "type": "movie",
        "id": "299534",
        "vote_average": 8.4,
        "vote_count": 20000
      },
      "imdb": {
        "id": "tt4154796",
        "vote_average": 8.4,
        "vote_count": 1000000
      }
    },
    "seoOnPage": {...},
    "breadCrumb": [...]
  }
}
404
Không tìm thấy phim
{
  "status": "error",
  "message": "Không tìm thấy phim"
}

API:Hình Ảnh
slug
Bắt buộc
string
Slug của phim

Ví dụ:

tro-choi-con-muc

{
  "success": true,
  "message": "Lấy dữ liệu thành công",
  "data": {
    "tmdb_id": 299534,
    "tmdb_type": "movie",
    "ophim_id": "66f8e123456789abcdef",
    "slug": "tro-choi-con-muc",
    "imdb_id": "tt4154796",
    "image_sizes": {
      "backdrop": {
        "original": "original",
        "w1280": "w1280",
        "w780": "w780",
        "w300": "w300"
      },
      "poster": {
        "original": "original",
        "w780": "w780",
        "w342": "w342",
        "w185": "w185"
      }
    },
    "images": [
      {
        "width": 1920,
        "height": 1080,
        "aspect_ratio": 1.778,
        "type": "backdrop",
        "file_path": "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"
      }
    ]
  }
}

API:Diễn viên
curl --request GET \
  --url https://ophim1.com/v1/api/phim/[slug]/peoples \
  --header 'accept: application/json'

  slug
Bắt buộc
string
Slug của phim

Ví dụ:

tro-choi-con-muc

{
  "success": true,
  "message": "Lấy dữ liệu thành công",
  "data": {
    "tmdb_id": 299534,
    "tmdb_type": "movie",
    "ophim_id": "66f8e123456789abcdef",
    "slug": "tro-choi-con-muc",
    "imdb_id": "tt4154796",
    "profile_sizes": {
      "h632": "h632",
      "original": "original",
      "w185": "w185",
      "w45": "w45"
    },
    "peoples": [
      {
        "tmdb_people_id": 3223,
        "adult": false,
        "gender": 2,
        "gender_name": "Nam",
        "name": "Robert Downey Jr.",
        "original_name": "Robert Downey Jr.",
        "character": "Tony Stark / Iron Man",
        "known_for_department": "Acting",
        "profile_path": "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
      }
    ]
  }
}

API:Từ Khoá

curl --request GET \
  --url https://ophim1.com/v1/api/phim/[slug]/keywords \
  --header 'accept: application/json'

  slug
Bắt buộc
string
Slug của phim

Ví dụ:

tro-choi-con-muc

{
  "success": true,
  "message": "Lấy dữ liệu thành công",
  "data": {
    "tmdb_id": 299534,
    "tmdb_type": "movie",
    "ophim_id": "66f8e123456789abcdef",
    "slug": "tro-choi-con-muc",
    "imdb_id": "tt4154796",
    "keywords": [
      {
        "tmdb_keyword_id": 9715,
        "name": "superhero",
        "name_vn": "siêu anh hùng"
      }
    ]
  }
}
