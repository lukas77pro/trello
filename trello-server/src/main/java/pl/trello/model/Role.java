package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority, Serializable {

    private static final long serialVersionUID = -6238240308689687938L;

    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
