package ema.brewtothefuture.db.repository;

import ema.brewtothefuture.db.model.DeviceDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<DeviceDB, String> {
    DeviceDB findBySerialNumber(String serialNumber);

    List<DeviceDB> findByUserId(String userId);
}
