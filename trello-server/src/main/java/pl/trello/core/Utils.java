package pl.trello.core;

import java.util.List;
import java.util.stream.IntStream;

public class Utils {

    public static <T extends Ordered> List<T> move(List<T> items, int previousIndex, int currentIndex) {
        T item = items.remove(previousIndex);
        items.add(currentIndex, item);
        IntStream.range(0, items.size()).forEach(index -> items.get(index).setOrder(index));
        return items;
    }
}
