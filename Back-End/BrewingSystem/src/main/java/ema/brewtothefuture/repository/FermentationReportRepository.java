package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.FermentationReportDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FermentationReportRepository extends JpaRepository<FermentationReportDB, Long> {
    List<FermentationReportDB> findAllByBrewId(long brewId);

    FermentationReportDB findFirstByBrewIdOrderByTimestampDesc(long brewId);
}
