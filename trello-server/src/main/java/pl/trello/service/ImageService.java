package pl.trello.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.trello.core.NotFoundException;
import pl.trello.model.Image;
import pl.trello.repository.ImageRepository;

import java.io.IOException;

@Service
public class ImageService {

    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public byte[] get(String id) throws NotFoundException {
        return imageRepository.findById(id).map(Image::getData).orElseThrow(() -> new NotFoundException("Image not found"));
    }

    public void create(MultipartFile image) throws IOException {
        imageRepository.save(Image.builder().data(image.getBytes()).build());
    }
}
