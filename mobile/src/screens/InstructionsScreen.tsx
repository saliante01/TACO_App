import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

const INSTRUCTIONS = [
  {
    id: '1',
    title: 'Ayuno',
    description: 'Asistir con al menos 8 horas de ayuno. Solo se permite agua.',
    icon: 'moon',
    important: true,
  },
  {
    id: '2',
    title: 'Medicación',
    description: 'No suspender la medicación anticoagulante a menos que el médico lo indique específicamente.',
    icon: 'medkit',
    important: true,
  },
  {
    id: '3',
    title: 'Documentación',
    description: 'Traer carnet TACO, cédula de identidad y órdenes médicas vigentes.',
    icon: 'id-card',
    important: false,
  },
  {
    id: '4',
    title: 'Alimentación',
    description: 'Mantener la dieta habitual los días previos al examen para no alterar los resultados.',
    icon: 'nutrition',
    important: false,
  },
  {
    id: '5',
    title: 'Ropa',
    description: 'Usar ropa holgada que permita acceder fácilmente al brazo para la toma de muestra.',
    icon: 'shirt',
    important: false,
  },
  {
    id: '6',
    title: 'Actividad física',
    description: 'Evitar ejercicio intenso 24 horas antes del examen.',
    icon: 'fitness',
    important: false,
  },
];

export default function InstructionsScreen() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleItem = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AnimatedCard delay={100}>
        <View style={styles.introRow}>
          <Ionicons name="information-circle" size={24} color={colors.primary} />
          <Text style={styles.introText}>
            Marca cada指示ación que hayas leído y comprendido antes de tu próximo control.
          </Text>
        </View>
      </AnimatedCard>

      {INSTRUCTIONS.map((item, index) => {
        const isChecked = checkedItems.includes(item.id);
        return (
          <AnimatedCard key={item.id} delay={150 + index * 80}>
            <TouchableOpacity
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.instructionRow}>
                <View
                  style={[
                    styles.checkbox,
                    isChecked && styles.checkboxChecked,
                    item.important && !isChecked && styles.checkboxImportant,
                  ]}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={18} color={colors.white} />
                  )}
                </View>
                <View style={styles.instructionIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={isChecked ? colors.secondary : colors.primary}
                  />
                </View>
                <View style={styles.instructionContent}>
                  <View style={styles.instructionTitleRow}>
                    <Text
                      style={[
                        styles.instructionTitle,
                        isChecked && styles.instructionTitleChecked,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.important && (
                      <View style={styles.importantBadge}>
                        <Text style={styles.importantText}>Importante</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.instructionDesc,
                      isChecked && styles.instructionDescChecked,
                      isChecked && { display: 'none' },
                    ]}
                    numberOfLines={isChecked ? 0 : 3}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </AnimatedCard>
        );
      })}

      {checkedItems.length === INSTRUCTIONS.length && (
        <AnimatedCard delay={700}>
          <View style={styles.completeRow}>
            <Ionicons name="checkmark-circle" size={32} color={colors.secondary} />
            <View style={styles.completeText}>
              <Text style={styles.completeTitle}>¡Todo listo!</Text>
              <Text style={styles.completeDesc}>
                Has revisado todas las indicaciones para tu control.
              </Text>
            </View>
          </View>
        </AnimatedCard>
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(checkedItems.length / INSTRUCTIONS.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {checkedItems.length} de {INSTRUCTIONS.length} leídas
        </Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  introText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  checkboxImportant: {
    borderColor: colors.warning,
  },
  instructionIcon: {
    marginTop: 2,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  instructionTitleChecked: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  importantBadge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  importantText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.warning,
  },
  instructionDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  instructionDescChecked: {
    display: 'none',
  },
  completeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  completeText: {
    flex: 1,
  },
  completeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  completeDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
