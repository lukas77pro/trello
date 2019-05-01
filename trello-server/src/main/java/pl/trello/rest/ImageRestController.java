package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.trello.core.NotFoundException;
import pl.trello.service.ImageService;

import java.io.IOException;

@RestController
@RequestMapping("images")
public class ImageRestController {

    private ImageService imageService;

    public ImageRestController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("{id}")
    public byte[] get(@PathVariable String id) throws NotFoundException {
        return imageService.get(id);
    }

    @PostMapping
    public void upload(@RequestParam MultipartFile image) throws IOException {
        imageService.create(image);
    }
}
