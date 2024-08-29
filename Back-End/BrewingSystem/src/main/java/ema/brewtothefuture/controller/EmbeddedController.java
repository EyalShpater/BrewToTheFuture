package ema.brewtothefuture.controller;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;
import ema.brewtothefuture.dto.embedded.EmbeddedRecipeDTO;
import ema.brewtothefuture.dto.embedded.FermentationReportDTO;
import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.service.BrewingSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/embedded")
public class EmbeddedController {
    private final BrewingSystem brewingSystem;

    @Autowired
    public EmbeddedController(BrewingSystemService brewingSystemService) {
        this.brewingSystem = brewingSystemService;
    }

    @GetMapping("{deviceSerialNumber}/brew/recipe")
    public EmbeddedRecipeDTO getRecipeToBrew(@PathVariable String deviceSerialNumber) {
        return brewingSystem.getRecipeToBrew(deviceSerialNumber);
    }

    // return status
    @PostMapping("{deviceSerialNumber}/brew/start")
    public void startBrewing(@PathVariable String deviceSerialNumber, @RequestParam long interval) {
        brewingSystem.startBrewing(deviceSerialNumber, interval);
    }

    @PutMapping("{deviceSerialNumber}/brew/recipe/marks_as_completed")
    public void markBrewingAsFinished(@PathVariable String deviceSerialNumber) {
        brewingSystem.markBrewingAsFinished(deviceSerialNumber);
    }

    @PostMapping("{deviceSerialNumber}/report/brewing")
    public int addBrewingReport(@PathVariable String deviceSerialNumber, @RequestBody BrewingReportDTO report) {
        brewingSystem.addBrewingReport(deviceSerialNumber, report);

        return brewingSystem.getBrewStatus(deviceSerialNumber);
    }

    @PostMapping("{deviceSerialNumber}/report/fermentation")
    public int addFermentationReport(@PathVariable String deviceSerialNumber, @RequestBody FermentationReportDTO report) {
        brewingSystem.addFermentationReport(deviceSerialNumber, report);

        return brewingSystem.getBrewStatus(deviceSerialNumber);
    }

}
