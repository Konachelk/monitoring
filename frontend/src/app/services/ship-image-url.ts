export function shipImage(mmsi) {
  const index = parseInt(mmsi.toString().slice(-3, -2));
  const urls = ['https://i.dailymail.co.uk/i/pix/2013/10/30/article-2479299-19110A2F00000578-524_634x327.jpg',
    'https://a.scpr.org/i/75bfdbffca93cddc7aa59c60150a8a8e/65602-full.jpg',
    'https://static.vesselfinder.net/ship-photo/9280720-311753000-dcdef0ba88259371371eb2b50b30154c/1',
    'https://cdn.pixabay.com/photo/2021/09/16/21/27/container-ship-6631117__480.jpg',
    'https://cdn.offshorewind.biz/wp-content/uploads/sites/6/2021/07/12092521/dji_0046_edited_copyright_hudong_shipyard_540x303.jpg',
    'https://static.vesselfinder.net/ship-photo/9242431-245406000-ffacead3a8d836506a3babd00c3bfe87/1',
    'https://static.vesselfinder.net/ship-photo/9285988-212175000-6be4e2a9f3686b44f18e9a5ba1ec09f5/1',
    'https://media-cdn.tripadvisor.com/media/photo-s/01/14/e8/b5/brig-unicorn.jpg',
    'https://thesciencebreaker.org/storage/breaks/images/fish-and-ships/fish-and-ships.jpeg',
    'https://www.flatbottomboatworld.com/wp-content/uploads/2020/07/Large-raft-floating-on-river.jpg'
  ];
  return urls[index] || urls[9];
}
