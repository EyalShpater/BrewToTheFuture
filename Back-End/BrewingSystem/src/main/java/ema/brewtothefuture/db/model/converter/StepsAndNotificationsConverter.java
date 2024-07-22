package ema.brewtothefuture.db.model.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.io.IOException;

public class StepsAndNotificationsConverter implements AttributeConverter<CombinedStepsNotifications, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(CombinedStepsNotifications attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting attribute to JSON", e);
        }
    }

    @Override
    public CombinedStepsNotifications convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, CombinedStepsNotifications.class);
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting JSON to attribute", e);
        }
    }

}
