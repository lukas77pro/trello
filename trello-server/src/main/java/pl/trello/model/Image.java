package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image implements Serializable {

    private static final long serialVersionUID = -2310476983495075830L;
    @Id
    private String id;

    private byte[] data;
}
