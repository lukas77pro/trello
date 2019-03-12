package pl.trello.rest;

import org.springframework.web.bind.annotation.*;
import pl.trello.core.NotFoundException;
import pl.trello.model.Table;
import pl.trello.repository.TableRepository;

import java.util.List;

@RestController
@RequestMapping("tables")
public class TableRestController {

    private TableRepository tableRepository;

    public TableRestController(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    @GetMapping
    public List<Table> getAll() {
        return tableRepository.findAll();
    }

    @GetMapping("{id}")
    public Table getById(@PathVariable String id) throws NotFoundException {
        return tableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Table with ID '" + id + "' not found"));
    }

    @PostMapping
    public Table create(@RequestBody Table table) {
        return tableRepository.save(table);
    }

    @PutMapping("{id}")
    public Table update(@PathVariable String id, @RequestBody Table table) throws NotFoundException {
        if (tableRepository.existsById(id)) {
            table.setId(id);
            return tableRepository.save(table);
        }
        throw new NotFoundException("Table with ID '" + table.getId() + "' not found");
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        tableRepository.deleteById(id);
    }
}
