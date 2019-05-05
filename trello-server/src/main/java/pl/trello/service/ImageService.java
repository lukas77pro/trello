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

    public Image get(String id, int size) throws NotFoundException {
        return imageRepository.findById(id).map(image -> {
            image.setData(size > 0 ? getScaled(image.getData(), size) : image.getData());
            return image;
        }).orElseThrow(() -> new NotFoundException("Image not found"));
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

    public String create(MultipartFile image, String userId) throws IOException, NotFoundException {
        String imageId = imageRepository.save(build(image)).getId();
        userService.setImageId(userId, imageId);
        return imageId;
    }

    private Image build(MultipartFile image) throws IOException {
        return Image.builder().data(image.getBytes()).contentType(image.getContentType()).build();
    }
}
