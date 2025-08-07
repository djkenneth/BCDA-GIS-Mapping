function generatePhotoGrid(site) {
  // Sample photos - replace with actual site photos
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1564763557753-051f91b57684?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Site overview",
    },
    {
      src: "https://images.unsplash.com/photo-1535779023901-a39d15762564?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Equipment view",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1661924187597-233d38b88221?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Maintenance area",
    },
  ];

  return photos
    .map(
      (photo, index) => `
    <div class="photo-item" data-index="${index}" data-toggle="modal" data-target="#modal-default">
      <img class="photo" src="${photo.src}" alt="${photo.alt}" loading="lazy">
    </div>
  `
    )
    .join("");
}
