package pl.trello.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.trello.core.NotFoundException;
import pl.trello.model.User;
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
    public byte[] get(@PathVariable String id, @RequestParam(defaultValue = "0") int size) throws NotFoundException {
        return imageService.get(id, size);
    }

    @PostMapping
    public String upload(@RequestParam MultipartFile image, @AuthenticationPrincipal User user) throws IOException, NotFoundException {
        return imageService.create(image, user.getId());
    }
}
