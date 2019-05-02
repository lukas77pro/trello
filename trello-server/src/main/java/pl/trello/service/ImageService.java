package pl.trello.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.trello.core.NotFoundException;
import pl.trello.model.Image;
import pl.trello.repository.ImageRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ImageService {

    private ImageRepository imageRepository;
    private UserService userService;

    public ImageService(ImageRepository imageRepository, UserService userService) {
        this.imageRepository = imageRepository;
        this.userService = userService;
    }

    public byte[] get(String id, int size) throws NotFoundException {
        return imageRepository.findById(id)
                .map(Image::getData)
                .map(data -> size > 0 ? getScaled(data, size) : data)
                .orElseThrow(() -> new NotFoundException("Image not found"));
    }

    private byte[] getScaled(byte[] data, int size) {
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(data);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Thumbnails.of(inputStream).forceSize(size, size).toOutputStream(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new byte[0];
    }

    public String create(MultipartFile image, String userId) throws IOException, NotFoundException { ;
        String imageId = imageRepository.save(Image.builder().data(image.getBytes()).build()).getId();
        userService.setImageId(userId, imageId);
        return imageId;
    }
}
