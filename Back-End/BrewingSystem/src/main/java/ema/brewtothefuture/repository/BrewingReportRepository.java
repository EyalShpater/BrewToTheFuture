package ema.brewtothefuture.repository;

import ema.brewtothefuture.db.model.BrewingReportDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrewingReportRepository extends JpaRepository<BrewingReportDB, Long> {
    List<BrewingReportDB> findAllByBrewId(long brewId);

    BrewingReportDB findFirstByBrewIdOrderByTimestampDesc(long brewId);
}
